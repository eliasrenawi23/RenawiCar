import React from "react";
import ViewToggleProvider from "@/context/ViewToggleContext";
import HomePageContent from "@/components/HomePageContent";

const HomePage: React.FC = () => {
  return (
    <ViewToggleProvider>
      <div className="p-5">
        <HomePageContent />
      </div>
    </ViewToggleProvider>
  );
};

export default HomePage;
