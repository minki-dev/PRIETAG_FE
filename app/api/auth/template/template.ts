import { DEFAULT_EDIT_TEMPLATE } from "@/store/slice/editTemplateSlice";
import { authHeader } from "../../api";

export const createTemplate = async () => {
  try {
		const res = await fetch(`https://ezfee.site/api/template/history`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Authorization: authHeader.authroization,
			},
			body: JSON.stringify(DEFAULT_EDIT_TEMPLATE),
		});
	} catch (err) {
		console.log(err);
	}
}