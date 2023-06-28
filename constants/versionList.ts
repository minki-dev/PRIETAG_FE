import { TemplateByVersion } from "@/store/slice/dashboardSlice";

export function translateVersionListData(data: TemplateByVersion[]) {
	return data.map((datum, index) => ({...datum, index: index + 1}))
}