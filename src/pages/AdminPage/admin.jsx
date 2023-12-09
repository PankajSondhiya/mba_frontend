import { Suspense, useEffect, useState } from "react";
import { fetchAllBookings } from "../../api/booking";
import { fetchAllMovies } from "../../api/movie";
import { fetchAllTheatres } from "../../api/theatre";
import { fetchAllUsers } from "../../api/user";
import Navbar from "../../components/Navbar";
import { ADMIN } from "../../constants";
import StatsDisplay from "./statsDisplay";

import { lazy } from "react";

const TheatreTable = lazy(() => import("../../components/theatreTable"));
const BookingTable = lazy(() => import("./bookingTable"));
const MovieTable = lazy(() => import("../../components/movieTable"));
const UserTable = lazy(() => import("./userTable"));

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("movies");
  const [bookingList, setBookingList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);
  const [userList, setUserList] = useState([]);

  async function fetchUsers() {
    const users = await fetchAllUsers();
    setUserList(users);
  }
  async function fetchBookings() {
    const bookings = await fetchAllBookings();
    setBookingList(bookings);
  }

  async function fetchTheaters() {
    const theatres = await fetchAllTheatres();
    setTheaterList(theatres);
  }

  async function fetchMovies() {
    const movies = await fetchAllMovies();
    setMovieList(movies);
  }

  useEffect(() => {
    fetchBookings();
    fetchTheaters();
    fetchMovies();
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container bg-light">
        <h3 className="text-center mt-2">
          Welcome, Admin {localStorage.getItem("name")}!
        </h3>
        <p className="text-center text-secondary">
          Take a quick look at the stats below
        </p>

        <StatsDisplay
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          movieList={movieList}
          bookingList={bookingList}
          userList={userList}
          theaterList={theaterList}
        />
        {selectedItem === "movies" && (
          <Suspense fallback={<div>Loading.....</div>}>
            <MovieTable
              movieList={movieList}
              userType={ADMIN}
              setMovieList={setMovieList}
              fetchMovies={fetchMovies}
            />
          </Suspense>
        )}
        {selectedItem === "theaters" && (
          <Suspense fallback={<div>Loading.....</div>}>
            <TheatreTable
              theaterList={theaterList}
              setTheatreList={setTheaterList}
              userType={ADMIN}
              movieList={[]}
            />
          </Suspense>
        )}
        {selectedItem === "bookings" && (
          <Suspense fallback={<div>Loading.....</div>}>
            <BookingTable bookingList={bookingList} />
          </Suspense>
        )}
        {selectedItem === "users" && (
          <Suspense fallback={<div>Loading.....</div>}>
            <UserTable userList={userList} setUserList={setUserList} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Admin;
