import Button from "@/components/Button";
import Link from "next/link";

const UserTable = ({ user, onDelete }) => {
    return (
        <div className="overflow-x-auto rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-yellow-300">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 py-4  text-xs  text-gray-500 uppercase tracking-wider font-bold"
                        >
                            Nama
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-4   text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-4   text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            No HP
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-4   text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Role
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-4   text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {user.map((item, index) => (
                        <tr key={index}>
                            <td className="px-2 py-4 text-center whitespace-nowrap">
                                {item.name}
                            </td>
                            <td className="px-2 py-4 text-center whitespace-nowrap">
                                {item.email}
                            </td>
                            <td className="px-2 py-4 text-center whitespace-nowrap">
                                {item.phone}
                            </td>
                            <td className="px-2 py-4 text-center whitespace-nowrap">
                                {item.role}
                            </td>
                            <td className="px-2 py-4 text-center whitespace-nowrap">
                                <div className="flex justify-center  gap-2 ">
                                    <Link href={`/dashboard/user/${item.id}`}>
                                        <div className="bg-color-1 flex bg-yellow-400 text-white w-[90px] justify-center p-1 gap-1 cursor-pointer rounded-md">
                                            <p>📝</p>
                                            <p>Edit</p>
                                        </div>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            onDelete(item.id);
                                        }}
                                    >
                                        <div className="bg-red-600 flex text-white w-[90px] rounded-rad-1 justify-center p-1 gap-1 cursor-pointer rounded-md">
                                            <p>❌</p>
                                            <p>Delete</p>
                                        </div>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
