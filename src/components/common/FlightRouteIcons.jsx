import { HiOutlinePaperAirplane } from "react-icons/hi";

export function FlightFromIcon(props) {
  return (
    <HiOutlinePaperAirplane {...props} className={`${props.className} -rotate-45`} />
  );
}

export function FlightToIcon(props) {
  return (
    <HiOutlinePaperAirplane {...props} className={`${props.className} rotate-45`} />
  );
}
