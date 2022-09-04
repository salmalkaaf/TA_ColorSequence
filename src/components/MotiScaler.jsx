import { memo } from "react";
import { MotiView } from "moti";

import Utils from "../common/Utils";

const MotiScaler = ({
  children,
  fromScale = 1,
  toScale = 1.03,
  duration = Utils.GenerateRandomInteger(500, 800),
}) => (
  <MotiView
    from={{ scale: fromScale }}
    animate={{ scale: toScale }}
    transition={{
      loop: true,
      type: "timing",
      duration,
    }}
  >
    {children}
  </MotiView>
);

export default memo(MotiScaler);
