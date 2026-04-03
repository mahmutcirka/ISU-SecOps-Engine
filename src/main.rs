use clap::{Parser, Subcommand};
use secops::modules::pentest::dns::{self, DnsArgs};
use colored::*;

#[derive(Parser)]
#[command(name = "secops")]
#[command(about = "ISU SecOps Engine CLI", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
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
        Commands::Pentest { module } => match module {
            PentestModules::Dns(args) => {
                println!("{}", "Starting DNS Enumeration...".bold().blue());
                dns::run(args).await?;
            }
        },
    }

    Ok(())
}
