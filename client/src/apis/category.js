const endpoint = import.meta.env.VITE_API_ENDPOINT;

const getCategories = async () => {
	const response = await fetch(`${endpoint}/categories`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to fetch categories");
	}

	return await response.json();
};

const createCategory = async (category) => {
	const response = await fetch(`${endpoint}/categories`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(category),
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to create category");
	}

	return await response.json();
};

const updateCategory = async (categoryId, payload) => {
	const response = await fetch(`${endpoint}/categories/${categoryId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to update category");
	}

	return await response.json();
};

const deleteCategory = async (categoryId) => {
	const response = await fetch(`${endpoint}/categories/${categoryId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || "Failed to delete category");
	}

	// If response status is 204 (No Content), do not try to parse JSON
	if (response.status === 204) {
		return true;
	}
};

export { getCategories, createCategory, updateCategory, deleteCategory };
