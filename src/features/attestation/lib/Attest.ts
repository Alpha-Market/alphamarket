import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import toast from "react-hot-toast";

// Configuration constants
// Need to configure for Arbitrum
const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia EAS contract address

export default async function createAttestation(
    signer: any,
    schemaId: string,
    recipientAddress: string,
    data: { name: string; value: string; type: string }[]
) {
    try {
        // Initialize provider and signer
        // const provider = new ethers.JsonRpcProvider(vars.get("ALCHEMY_API_URL"));
        // Need to capture these from the user
        // const signer = new ethers.Wallet(vars.get("SEPOLIA_PRIVATE_KEY"), provider);
        const eas = new EAS(EAS_CONTRACT_ADDRESS);
        eas.connect(signer);

        // Initialize SchemaEncoder with the schema string
        // Need to define the schema for the content we want to attest
        const schemaEncoder = new SchemaEncoder(
            "string reviewerName,string reviewerRole,string review"
        ); // e.g., bytes32 contentHash, string urlOfContent
        const encodedData = schemaEncoder.encodeData(data);

        // Send transaction
        const tx = await eas.attest({
            schema: schemaId,
            data: {
                recipient: recipientAddress, // The Ethereum address of the recipient of the attestation. Host/Gro++up
                expirationTime: BigInt(0), // The expiration time of the attestation. Set to 0 for no expiration. optional
                revocable: false, // Note that if schema is not revocable, this MUST be false
                // refUID: "YOUR_REFERENCE_UID", // The reference UID of the attestation. optional, can be used to link attestations (sub-comments?);
                data: encodedData, // The encoded data
            },
        });

        const newAttestationUID = await tx.wait();
        console.log("New attestation UID:", newAttestationUID);
        return newAttestationUID;
    } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Error in attesting the review on chain");
        return "";
    }
}
