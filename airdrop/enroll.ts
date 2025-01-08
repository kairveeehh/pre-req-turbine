import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL as Turbin3PrereqIDL, Turbine3Prereq } from "../programs/turbine";
import wallet from "./Turbine-wallet.json";
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("kairveeehh", "utf-8");
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});
const program: Program<Turbine3Prereq> = new Program(Turbin3PrereqIDL as unknown as Turbine3Prereq, provider);
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);
(async () => {
  try {
    const tx = await program.methods
      .complete(github)
      .accounts({ signer: keypair.publicKey })
      .signers([keypair])
      .rpc();
    console.log(
      `Success! Check out your transaction here: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
  } catch (error) {
    console.log("Error occurred: ", error);
  }
})();


//Success! Check out your transaction here:
//  https://explorer.solana.com/tx/2SYoKtFZT2XdapDGQvwMMpVpgs9SoKFLsNi8L8siFT7y66C5z6BTToEPkTNqxWbgyrM245gmTaHpZsht1NXAa2rE?cluster=devnet