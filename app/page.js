import EventCard from "@/components/events/EventCard";
import { getAllEvents } from "@/actions/eventActions";
import { GetCategories } from "@/actions/categoryActions";
import CategoryFilter from "@/components/categories/CategoryFilter";
import TagFilter from "@/components/tags/TagFilter";
import { GetTags } from "@/actions/tagActions";
import Pagination from "@/components/events/Pagination";

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const { events, page, totalPages } = await getAllEvents(searchParams);
  const categories = await GetCategories();
  const tags = await GetTags();
  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Upcoming Events
      </h1>
      <div className="flex flex-col gap-1 mb-4">
        <CategoryFilter categories={categories} />

        <TagFilter tags={tags} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
