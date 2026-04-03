use hickory_resolver::TokioAsyncResolver;
use hickory_resolver::config::{ResolverConfig, ResolverOpts, NameServerConfig, Protocol};
use std::net::{SocketAddr, IpAddr};
use std::sync::Arc;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let mut opts = ResolverOpts::default();
    opts.rotate = true;

    let mut config = ResolverConfig::new();
    let ns_list = vec!["8.8.8.8", "1.1.1.1"];
    for ns in ns_list {
        if let Ok(ip) = ns.parse::<IpAddr>() {
            config.add_name_server(NameServerConfig::new(SocketAddr::new(ip, 53), Protocol::Udp));
        }
    }

    let resolver = TokioAsyncResolver::tokio(config, opts);
    println!("Testing DNS resolution for google.com...");
    match resolver.lookup_ip("google.com.").await {
        Ok(ips) => println!("Success: {:?}", ips.iter().collect::<Vec<_>>()),
        Err(e) => println!("Error: {}", e),
    }
    Ok(())
}
