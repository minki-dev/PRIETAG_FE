import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Subheader from '../components/Subheader';
import ReturnToList from '../components/ReturnToList';
import SearchInput from '../components/SearchInput';
import TableListSection from '../components/TableListSection';

export default async function Template({
	params: { id },
}: {
	params: { id: string };
}) {
	return (
		<>
			<Header />
			<Subheader title="편집" />
			<div className="h-full  w-full  bg-[#F7F8FC]  px-[240px] pb-[240px] pt-[80px]">
				<div className="relative flex h-[56px]  w-full min-w-[900px] items-center justify-between">
					<ReturnToList />
					<SearchInput />
				</div>
				<TableListSection id={id} />
			</div>
			<Footer />{' '}
		</>
	);
}
