
const Blog = () => {
    document.title = "Blog || Abir's Restaurant";
    return (
        <div>
            <section className="bg-base-200 text-black">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl">Know Some Common Questions</h2>
                    <div className="divide-y divide-gray-700">
                        <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                            <h3 className="font-semibold md:col-span-5">What is One way data binding?</h3>
                            <p className="md:pl-0 md:col-span-7">One-way data binding is a concept in web development that refers to the synchronization of data between the model (data source) and the view (user interface) in a unidirectional manner. In this approach, changes in the model automatically update the corresponding view, but changes in the view do not affect the model directly. This ensures a clear and predictable flow of data, simplifying the application's architecture and making it easier to understand and maintain. One-way data binding is commonly used in frameworks like React and Angular, where the view reflects the state of the model, and any updates to the model trigger automatic updates to the view without causing circular dependencies or unexpected behavior..</p>
                        </div>
                        <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                            <h3 className="font-semibold md:col-span-5">What is NPM in node.js?</h3>
                            <p className="md:pl-0 md:col-span-7">npm, or Node Package Manager, is a crucial component of the Node.js ecosystem, serving as a centralized repository for managing and sharing JavaScript libraries and tools. It simplifies the process of installing, updating, and managing dependencies in Node.js projects. With npm, developers can easily access a vast collection of packages, each encapsulating reusable code or utilities. It enables efficient project development by providing a straightforward way to declare, install, and track project dependencies, fostering a modular and scalable approach to building applications. Additionally, npm facilitates collaboration within the developer community, as it allows individuals and teams to share their code contributions with others, contributing to the growth and innovation of the Node.js ecosystem..</p>
                        </div>
                        <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                            <h3 className="font-semibold md:col-span-5">Different between Mongodb database vs mySQL database.</h3>
                            <p className="md:pl-0 md:col-span-7">MongoDB and MySQL are both popular database management systems, but they differ in their data models and structures. MySQL is a relational database system, following the traditional table-based approach with predefined schemas, suitable for structured data. It uses SQL for querying and transactions. In contrast, MongoDB is a NoSQL, document-oriented database, storing data in flexible, JSON-like documents without the need for predefined schemas. This makes MongoDB well-suited for handling unstructured or semi-structured data, providing scalability and flexibility. While MySQL excels in complex, structured data relationships and transactions, MongoDB is preferred for projects with evolving or diverse data structures where quick development and scalability are priorities. The choice between MongoDB and MySQL often depends on the specific requirements and nature of the data within a given application.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;