# --- Build Stage ---
FROM rust:1.80-slim as builder

WORKDIR /app
COPY . .

# Build for release
RUN cargo build --release

# --- Run Stage ---
FROM debian:bookworm-slim

RUN apt-get update && apt_get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/target/release/dns-enumeration /app/dns-enumeration
# Copy public assets for web dashboard
COPY --from=builder /app/public /app/public

EXPOSE 3000

ENTRYPOINT ["/app/dns-enumeration"]
CMD ["server", "--port", "3000"]
