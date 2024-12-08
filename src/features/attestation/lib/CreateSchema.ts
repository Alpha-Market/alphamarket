import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

// Configuration constants
const schemaRegistryContractAddress
    = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia Schema Registry contract address
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

export async function registerSchema() {
	try {
		// Initialize provider and signer
		const provider = new ethers.JsonRpcProvider(
			// process.env.ALCHEMY_SEPOLIA_API_URL
			"https://eth-sepolia.g.alchemy.com/v2/_E6_LJh23lw5z9fLVdAHy-U8xkx1-cul",
		);

		const signer = new ethers.Wallet(
			process.env.WALLET_PRIVATE_KEY as string,
			provider,
		);
		schemaRegistry.connect(signer);

		// Initialize SchemaEncoder with the schema string
		const schema
            = "string reviewerName, string reviewerRole, string review";
		const revocable = true;

		const transaction = await schemaRegistry.register({
			schema,
			revocable,
		});

		// Optional: Wait for transaction to be validated
		await transaction.wait();
	}
	catch (error) {
		console.error("An error occurred:", error);
	}
}
