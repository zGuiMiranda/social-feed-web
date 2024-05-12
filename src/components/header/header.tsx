export const Header = ({ text }: { text: string }) => {
  return (
    <>
      <div className="bg-black">
        <div className="flex justify-center p-8">
          <h2 className="text-[#dc1783]">{text}</h2>
        </div>
      </div>
    </>
  );
};
