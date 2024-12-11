export function getApiBase() {
	switch (process.env.ENV) {
		case "development":
		case "dev":
			return process.env.NEXT_PUBLIC_DEV_API_BASE || "undefined";
		case "production":
		case "prod":
			return process.env.NEXT_PUBLIC_PROD_API_BASE || "undefined";
		default:
			return process.env.NEXT_PUBLIC_DEV_API_BASE || "undefined";
	}
}

export function getApiBaseForNextApiRoute() {
	switch (process.env.NEXT_PUBLIC_BUILD_ENV) {
		case "development":
		case "dev":
			return process.env.NEXT_PUBLIC_DEV_API_BASE || "undefined";
		case "production":
		case "prod":
			return process.env.NEXT_PUBLIC_PROD_API_BASE || "undefined";
		default:
			return process.env.NEXT_PUBLIC_DEV_API_BASE || "undefined";
	}
}
