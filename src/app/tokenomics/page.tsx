import StayTuned from "@/components/StayTuned/StayTuned";
import CommonBackground from "@/components/Tokenomica/CommonBackground/CommonBackground";
import FSQNTokenSection from "@/components/Tokenomica/FSQNTokenSection/FSQNTokenSection";
import RoadMapSection from "@/components/Tokenomica/RoadMapSection/RoadMapSection";
import Graf from "@/components/Tokenomica/TokenomicsSection/TokenomicsSection";
import TokenomicsSection from "@/components/Tokenomica/TokenomicsSection/TokenomicsSection";
import TokenUtilitySection from "@/components/Tokenomica/TokenUtilitySection/TokenUtilitySection";

export default function Page() {
    return (
      <main>
       <FSQNTokenSection/>
       <StayTuned/>
       <div style={{ position: "relative"}}>
       <CommonBackground />
       <TokenUtilitySection/>
       <Graf/>
       </div>
       <RoadMapSection/>
      </main>
    );
  }