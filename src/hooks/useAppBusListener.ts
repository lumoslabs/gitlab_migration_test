import { useEffect } from "react"
import useAppBus from "./useAppBus"
import { appBusEvents } from "@contexts/AppBusContext";
import { Handler } from "mitt";

export default function useAppBusListener<Key extends keyof appBusEvents>(name: keyof appBusEvents, fn: Handler<appBusEvents[Key]>) {
  const bus = useAppBus()
  useEffect(() => {
    bus.on(name, fn)
    return () => {
      bus.off(name, fn)
    }
  }, [bus, name, fn])
}
