const NewTransactionTable = ({ transactions }) => {
    return (
        <div className="overflow-x-auto rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-yellow-300">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 py-4 text-center text-xs  text-gray-500 uppercase tracking-wider font-bold"
                        >
                            Nama Produk
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Nama Pembeli
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-4  text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Alamat
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="px-2 py-4 whitespace-nowrap">
                                {transaction.Product.name}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                                {transaction.buyer}
                            </td>
                            <td className="px-2 py-4 whitespace-nowrap">
                                {transaction.address}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewTransactionTable;
