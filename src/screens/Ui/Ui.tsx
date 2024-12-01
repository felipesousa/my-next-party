import { createClient } from "@supabase/supabase-js";
import { StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const supabaseUrl = "https://juwlfiepovrtgsuwcvmc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1d2xmaWVwb3ZydGdzdXdjdm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTU4NzksImV4cCI6MjA0Nzk3MTg3OX0.JZyxWxhCUqEBKTI2uAqt73CnRWKCESY4vdYCEH9zbFs";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = ["All", "Pop", "Rap", "Reggae", "Country", "Funk"];

export const Ui = (): JSX.Element => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("*");
      setEvents(data || []);
    };
    fetchEvents();
  }, []);

  const filteredEvents = (events || []).filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.genre === selectedCategory;
    const matchesSearch = event.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex flex-col min-h-screen bg-neutral-50">
      <header className="flex items-center flex-wrap justify-center gap-10 px-11 py-14 bg-white">
        <h1 className="font-bold text-3xl tracking-tight">Your Next Party</h1>

        <img
          src="/img/image-1.png"
          alt="Logo"
          className="w-[85px] h-[85px] object-cover"
        />

        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[60px] px-8 rounded-[32px] border-wwwairbnbcaalto shadow-[0px_1px_2px_#00000014,0px_3px_12px_#0000001a]"
          />
        </div>
      </header>

      <nav className="flex justify-center flex-wrap gap-10 py-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-3 relative ${
              selectedCategory === category
                ? "text-wwwairbnbcablack border-b-2 border-b-sky-900"
                : "text-wwwairbnbcadove-gray"
            }`}
          >
            {category}
          </button>
        ))}
      </nav>

      <section className="flex flex-wrap justify-center gap-10 p-4 flex-1">
        {filteredEvents.map((event, index) => (
          <Card
            key={index}
            className="w-[298.66px] overflow-hidden border-none"
          >
            <div className="h-[283.73px] overflow-hidden rounded-xl">
              <img
                src={event.image}
                alt={event.location}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="pt-3 px-0">
              <div className="flex items-center justify-between">
                <span className="text-wwwairbnbcamine-shaft text-[15px]">
                  {event.location}
                </span>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-3 h-3" />
                  <span className="text-wwwairbnbcamine-shaft text-[15px]">
                    {event.rating}
                  </span>
                </div>
              </div>

              <div className="mt-1.5">
                <p className="font-bold text-wwwairbnbcadove-gray text-[15px]">
                  {event.genre}
                </p>
                <p className="font-semibold text-wwwairbnbcamine-shaft text-[15px]">
                  {event.price}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};
