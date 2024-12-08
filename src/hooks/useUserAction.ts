import type { Campaign, DeepPartial, Group, Review, User } from "@/types";
import useUser from "@/hooks/useUser";
import { apiClient } from "@/lib/apiClient";

export default function useUserAction() {
	const [_, setUser] = useUser();

	async function refetchUser() {
		const res = await apiClient.get("/user");
		const user: User = res.data.user;
		setUser(user);
	}

	async function updateUser(item: DeepPartial<User>): Promise<void> {
		await apiClient.patch("/user/update", item);
	}

	async function createGroup(item: Omit<Group, "id" | "created_at">): Promise<void> {
		await apiClient.post("/user/create-group", item);
	}

	async function createReview(item: Omit<Review, "id" | "created_at">): Promise<void> {
		await apiClient.post("/user/create-review", item);
	}

	async function createCampaign(item: Omit<Campaign, "id" | "created_at">): Promise<void> {
		await apiClient.post("/user/create-campaign", item);
	}

	async function uploadFile(file: File | Blob, uploadFor: "profile" | "group" | "campaign"): Promise<string> {
		const res = await apiClient.postForm("/user/uploadfile", {
			file,
			upload_for: uploadFor,
		});

		return res.data.public_url;
	}

	return {
		refetchUser,
		updateUser,
		createGroup,
		createReview,
		createCampaign,
		uploadFile,
	};
}
