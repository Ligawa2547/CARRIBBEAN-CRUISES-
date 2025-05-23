"use client"

import { track } from "@vercel/analytics"

export function useAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      track(eventName, properties)
    }
  }

  const trackJobApplication = (jobId: string, jobTitle: string) => {
    trackEvent("job_application_started", {
      job_id: jobId,
      job_title: jobTitle,
    })
  }

  const trackJobView = (jobId: string, jobTitle: string) => {
    trackEvent("job_viewed", {
      job_id: jobId,
      job_title: jobTitle,
    })
  }

  const trackCruiseView = (cruiseId: string, cruiseName: string) => {
    trackEvent("cruise_viewed", {
      cruise_id: cruiseId,
      cruise_name: cruiseName,
    })
  }

  const trackVideoPlay = (videoId: string, videoTitle: string) => {
    trackEvent("video_played", {
      video_id: videoId,
      video_title: videoTitle,
    })
  }

  const trackMenuView = () => {
    trackEvent("menu_viewed")
  }

  const trackContactForm = () => {
    trackEvent("contact_form_submitted")
  }

  return {
    trackEvent,
    trackJobApplication,
    trackJobView,
    trackCruiseView,
    trackVideoPlay,
    trackMenuView,
    trackContactForm,
  }
}
