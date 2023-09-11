import { useEffect, useState } from "react";

import * as userService from './services/userService'

import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { Search } from "./components/search/Search";
import { UserList } from "./components/user-list/UserList";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll()
      .then(users => setUsers(users));
  }, []);

  return (
    <>
      <Header />

      {/* <!-- Main component  --> */}
      <main className="main">
        {/* <!-- Section component  --> */}
        <section className="card users-container">

          <Search />
          <UserList users={users} />

          {/* New user button */}

          {/* Pagination component*/}

        </section>

      </main>
      <Footer />

    </>
  );
}

export default App;
