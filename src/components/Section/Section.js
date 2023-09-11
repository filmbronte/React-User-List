import { Search } from "../Search/Search";
import { UserList } from "../UserList/UserList";

function Section() {

    return (
        <section className="card users-container">
            <Search />
            <UserList />
        </section>
    );
}

export default Section;