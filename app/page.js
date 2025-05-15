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
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <CategoryFilter categories={categories} />
      <TagFilter tags={tags} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
