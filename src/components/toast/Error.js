const Error = () => (
  <div className="absolute p-5 bg-red-200 bottom-10 right-10 align-middle text-red-600">
    <p className="text-sm">
      There's already a note being edited. Finish that one first!
    </p>
  </div>
);

export default Error;
