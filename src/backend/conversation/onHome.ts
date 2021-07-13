import { ConversationV3 } from "actions-on-google";
import appSharedActions from "@store/slices/appSharedActions";
import { sendCommand } from "./utils";

export default async (conv: ConversationV3) => {
  conv.add("Back to Main Menu");
  sendCommand({
    conv,
    command: appSharedActions.GO_TO,
    payload: '/home',
  })
}
