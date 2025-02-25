import StayTuned from "@/components/StayTuned/StayTuned";
import FSQNTokenSection from "@/components/Tokenomica/FSQNTokenSection/FSQNTokenSection";
import RoadMapSection from "@/components/Tokenomica/RoadMapSection/RoadMapSection";
// import TokenomicsSection from "@/components/Tokenomica/TokenomicsSection/TokenomicsSection";
import TokenUtilitySection from "@/components/Tokenomica/TokenUtilitySection/TokenUtilitySection";

export default function Page() {
    return (
      <main>
       <FSQNTokenSection/>
       <StayTuned/>
       <TokenUtilitySection/>
       {/* <TokenomicsSection/> */}
       <RoadMapSection/>
      </main>
    );
  }