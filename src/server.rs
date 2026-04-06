use crate::modules::pentest::dns::{self, DnsArgs, DnsResult};
use axum::response::IntoResponse;
use axum::{Json, Router, routing::post};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;

#[derive(Deserialize)]
pub struct EnumerateRequest {
    pub domain: String,
    pub wordlist: Option<String>,
}

#[derive(Serialize)]
pub struct EnumerateResponse {
    pub success: bool,
    pub data: Option<DnsResult>,
    pub error: Option<String>,
}

/// API sunucusunu belirtilen port üzerinden başlatır.
pub async fn start(port: u16) {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Axum Router yapılandırması: 
    // - /api/dns/enumerate: Ana tarama endpoint'i.
    // - ServeDir: Frontend (HTML/JS/CSS) dosyalarını sunar.
    // - CORS: Geliştirme aşamasında esneklik sağlamak için 'Any' izinleri verilmiştir.
    // FIX: Prodüksiyon ortamında CORS kısıtlanmalıdır.
    let app = Router::new()
        .route("/api/dns/enumerate", post(handle_enumerate))
        .fallback_service(ServeDir::new("public"))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    println!("📡 ISU-SecOps API Server running at http://{}", addr);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

/// DNS tarama isteğini işleyen ana API handler fonksiyonu.
async fn handle_enumerate(Json(payload): Json<EnumerateRequest>) -> impl IntoResponse {
    println!("📡 Received enumeration request for: {}", payload.domain);
    let args = DnsArgs {
        domain: payload.domain.clone(),
        wordlist: payload.wordlist,
    };

    match dns::run_api(args).await {
        Ok(result) => Json(EnumerateResponse {
            success: true,
            data: Some(result),
            error: None,
        }),
        Err(e) => Json(EnumerateResponse {
            success: false,
            data: None,
            error: Some(e.to_string()),
        }),
    }
}
