use clap::{Parser, Subcommand};
use colored::*;
use secops::modules::pentest::dns::{self, DnsArgs};

#[derive(Parser)]
#[command(name = "secops")]
#[command(about = "ISU SecOps Engine CLI", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Web API sunucusunu başlatır
    Server {
        #[arg(short, long, default_value = "3000")]
        port: u16,
    },
    /// Penetration testing modules
    Pentest {
        #[command(subcommand)]
        module: PentestModules,
    },
}

#[derive(Subcommand)]
enum PentestModules {
    /// Modül 4: DNS Enumeration
    Dns(DnsArgs),
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Server { port } => {
            secops::server::start(port).await;
        }
        Commands::Pentest { module } => match module {
            PentestModules::Dns(args) => {
                println!("{}", "Starting DNS Enumeration...".bold().blue());
                dns::run(args).await?;
            }
        },
    }

    Ok(())
}
