import { DEFAULT_EDIT_TEMPLATE } from "@/store/slice/editTemplateSlice";
import { getAccessToken, BASE_URL } from "@/fetch/const";
export async function createTemplate() {
  try {
    const token = getAccessToken()
    if (token){
      const blob = new Blob([JSON.stringify(DEFAULT_EDIT_TEMPLATE)], {
        type: 'application/json',
      });
      // console.log(await blob.arrayBuffer());
      const formData = new FormData();
      formData.append('saveInDTO', blob);
  
      const res = await fetch(`${BASE_URL}template`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: token
        },
        body: formData,
      });
      const result = await res.json()
      // console.log(result)
  
    }
  } catch (err) {
    console.log(err);
  }
};