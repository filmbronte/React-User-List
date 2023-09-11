import { useEffect, useState } from "react";

import * as userService from '../../../services/userService'

import { Search } from "./search/Search";
import { UserList } from "./user-list/UserList";

function Section() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll()
            .then(users => setUsers(users));
    }, []);

    return (
        <section className="card users-container">
            <Search />
            <UserList users={users} />
            {/* New user button */}

            {/* Pagination component*/}

        </section>

    );
}

export default Section;