import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const toWallet = new PublicKey("86gsWCEgo8VRr4rA3Bznh3jAArhL4TqrTBifxfyQfgzP");
const connection = new Connection("https://api.devnet.solana.com");
(async () => {
  try {
    const balance = await connection.getBalance(keypair.publicKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: toWallet,
        lamports: balance,
      })
    );
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = keypair.publicKey;
    const fee =
    (
      await connection.getFeeForMessage(
        transaction.compileMessage(),
        "confirmed"
      )
    ).value || 0;
  transaction.instructions.pop();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: toWallet,
      lamports: balance - fee,
    })
  );
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      keypair,
    ]);
    console.log(
      `Success! Check out your transaction here: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
  } catch (error) {
    console.log("Error occured: ", error);
  }
})();
// initial 
//Success! Check out your transaction here:
//  https://explorer.solana.com/tx/5GUou8Hm83ur2UuxMM5wBMWDxjnLSZEPszrRsUY39LPx5UgCKzQbkAWm3mpC3Z3EbaLSxySEahusK3t9b7JMTkx?cluster=devnet

// complete wallet drain 
//Success! Check out your transaction here:
//  https://explorer.solana.com/tx/oawsiJW9PdmaTcoUX7qrnhiduKPyYi9MzC3yrvFcokPsnYme2noXFVHzbBPt2kqmhs6P9Q9uZeNVSgtR68Rh7NG?cluster=devnet