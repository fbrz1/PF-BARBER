import { Box } from "@material-ui/core";
import NavBar from "./NavBar";
import Score from "./score.js";

function barNav() {
  return (
    <Box>
      <NavBar />
      <Score />
    </Box>
  );
}
export default barNav;
