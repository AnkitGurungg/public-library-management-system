import { useQuery } from "@tanstack/react-query";
import { useFetchShelfs } from "../hooks/useFetchShelfs";

const Shelfs = () => {
  const { data: shelfs, isLoading } = useFetchShelfs();
  console.log(shelfs?.data);
  console.log(shelfs?.status);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Added Date</td>
            <td>Updated Date</td>
            <td>Limit</td>
            <td>Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {shelfs?.status === 404 || shelfs?.status === 500 ? (
            <tr>
              <td>{shelfs.data}</td>
            </tr>
          ) : (
            shelfs?.data.map((element, index) => (
              <tr key={element.shelfId || index}>
                <td>{element.shelfId}</td>
                <td>{element.name}</td>
                <td>{element.addedDate}</td>
                <td>{element.updatedDate}</td>
                <td>{element.limit}</td>
                <td>{element.category.name}</td>
                <td>
                  <img src="../../../../react.svg" alt="Loading" />
                  <img src="../../../../react.svg" alt="Loading" />
                  <img src="../../../../react.svg" alt="Loading" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Shelfs;
