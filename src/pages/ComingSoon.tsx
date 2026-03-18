import comingSoonBg from "@/assets/coming-soon-bg.png";

const ComingSoon = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] animate-fade-in">
      <img
        src={comingSoonBg}
        alt="Coming Soon – SpaceBox Concepts"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ComingSoon;
