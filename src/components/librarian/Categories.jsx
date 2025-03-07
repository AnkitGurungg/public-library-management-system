import { useFetchCategory } from "../hooks/useFetchCategory";

const Categories = () => {
  const { data: categories } = useFetchCategory();
  console.log(categories?.data);
  console.log(categories?.status);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>name</th>
            <th>Starting number</th>
            <th>Ending number</th>
            <th>Added date</th>
            <th>Updated date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.status === 404 || categories?.status === 500 ? (
            <tr>
              <td>{categories?.data}</td>
            </tr>
          ) : (
            categories?.data.map((element, index) => (
              <tr key={element.id || index}>
                <td>{element.name}</td>
                <td>{element.startingNumber}</td>
                <td>{element.endingNumber}</td>
                <td>{element.addedDate}</td>
                <td>{element.updatedDate}</td>
                <td>
                  <img src="../../../../react.svg" alt="" />
                  <img src="../../../../react.svg" alt="" />
                  <img src="../../../../react.svg" alt="" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;