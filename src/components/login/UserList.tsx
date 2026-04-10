import {type User} from "@jield/solodb-typescript-core";
import {useEffect, useState} from "react";
import {getServerUri} from "../../helpers/runtimeConfig";
import {
    getUserManagerToken,
    loginWithUser,
} from "../../auth/helpers/pickUserLogin";

async function fetchUsers(): Promise<User[]> {
    const token = getUserManagerToken();
    if (token === null) return [];

    const endpoint = `${getServerUri()}/list/user?`;

    // Raw fetch so we dont need to send the token to axios
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok)
        throw new Error(
            `Request failed: ${response.status} ${response.statusText}`,
        );

    const resp = await response.json();
    const items = resp?._embedded?.items;

    if (!Array.isArray(items) || items.length === 0) return [];

    // if the items are not users return a empty array
    if (isNaN(items[0]?.id)) return [];

    return items as User[];
}

export default function UserList() {
    const [userList, setUserList] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchUsers()
            .then((res) => {
                if (!isMounted) return;
                setUserList(res);
            })
            .catch((error: unknown) => {
                if (!isMounted) return;
                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Unable to load users right now.",
                );
            })
            .finally(() => {
                if (!isMounted) return;
                setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const pickUser = (userId: number) => {
        loginWithUser(userId)
            .then(() => {
                location.reload();
            })
            .catch((reason) => {
                setErrorMessage(`${reason}`);
            });
    };

    if (isLoading) {
        return (
            <div className="alert alert-secondary mb-0" role="status">
                Loading users...
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="alert alert-danger mb-0" role="alert">
                {errorMessage}
            </div>
        );
    }

    return (
        <section className="d-grid gap-3">
            {userList.length > 0 ? (
                <ul className="list-group">
                    {userList.map((usr) => (
                        <li
                            key={usr.id}
                            className="list-group-item d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2"
                        >
                            <div>
                                <div className="fw-semibold">{usr.full_name}</div>
                                <div className="small text-secondary">ID: {usr.id}</div>
                            </div>
                            <button
                                onClick={() => pickUser(usr.id)}
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                            >
                                Pick user
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="alert alert-warning mb-0" role="alert">
                    No users found.
                </div>
            )}
        </section>
    );
}
