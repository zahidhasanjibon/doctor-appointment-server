import Rating from "react-star-rating-lite";

export default function ReviewTableRow({
  review,
  handleDelete,
  setUpdateDataToModal,
}) {
  const { _id, serviceName, msg,rating } = review || {};

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{serviceName}</div>
            </div>
          </div>
        </td>
        <td>{msg}</td>
        <td>{ rating &&  <Rating value={rating} readonly weight="12" />}</td>

        <td>
          <label
            onClick={() => setUpdateDataToModal(review)}
            htmlFor="my-modal"
            className="btn btn-sm btn-primary"
          >
            update
          </label>
        </td>
        <th>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm btn-secondary"
          >
            delete
          </button>
        </th>
      </tr>
    </>
  );
}
