const EmptyMemories = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        {`You haven't registered any memories yet, start `}
        <a className="underline hover:text-gray-50" href="">
          creating now
        </a>
        !
      </p>
    </div>
  );
};

export default EmptyMemories;
