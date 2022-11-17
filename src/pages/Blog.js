import UseTitle from "../component/hook/useTitle";

export default function Blog() {


    UseTitle("Blog")

  return (
    <div className="container mx-auto">
      <div className="w-[90%] mx-auto mt-16 pb-6">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          <div className="shadow-lg p-4">
            <h2 className="text-center mb-4 font-bold text-xl text-blue-600">
              Difference between SQL and NoSQL ?
            </h2>

            <p>
              SQL databases are relational, NoSQL databases are non-relational.
            </p>
            <p>
              SQL databases use structured query language and have a predefined
              schema. NoSQL databases have dynamic schemas for unstructured
              data.
            </p>
            <p>
              SQL databases are table-based, while NoSQL databases are document,
              key-value, graph, or wide-column stores.
            </p>
            <p>
              SQL databases are better for multi-row transactions, while NoSQL
              is better for unstructured data like documents or JSON
            </p>
          </div>
          <div className="shadow-lg p-4">
            <h2 className=" text-center mb-4 font-bold text-xl text-blue-600">
              What is JWT, and how does it work?
            </h2>

            <p>
              JSON Web Token (JWT) is an open standard (RFC 7519) for securely
              transmitting information between parties as JSON object.
            </p>
            <p>
              It is compact, readable and digitally signed using a private key/
              or a public key pair by the Identity Provider(IdP). So the
              integrity and authenticity of the token can be verified by other
              parties involved.
            </p>

            <p>
              The purpose of using JWT is not to hide data but to ensure the
              authenticity of the data. JWT is signed and encoded, not
              encrypted.
            </p>
          </div>

          <div className="shadow-lg p-4">
            <h2 className="text-center mb-4 text-xl text-blue-600 font-bold">
              What is the difference between javascript and NodeJS?
            </h2>
            <p>
              1. Javascript is a programming language that is used for writing
              scripts on the website. NodeJS is a Javascript runtime
              environment.
            </p>

            <p>
              2. Javascript can only be run in the browsers. We can run
              Javascript outside the browser with the help of NodeJS.
            </p>
            <p>
              Javascript is used in frontend development. Nodejs is used in
              server-side development.
            </p>
          </div>
          <div className="shadow-lg p-4">
            <h2 className="text-center mb-4 text-xl text-blue-600 font-bold">
              How does NodeJS handle multiple requests at the same time?
            </h2>

            <p>
              NodeJS receives multiple client requests and places them into
              EventQueue. NodeJS is built with the concept of event-driven
              architecture. NodeJS has its own EventLoop which is an infinite
              loop that receives requests and processes them. EventLoop is the
              listener for the EventQueue. If NodeJS can process the request
              without I/O blocking then the event loop would itself process the
              request and sends the response back to the client by itself. But,
              it is possible to process multiple requests parallelly using the
              NodeJS cluster module or worker_threads module.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
