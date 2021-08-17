import { POINTS_OF_LEVEL } from "./../constants/courses/index"
import { COURSES, COURSES_KO } from "../constants"
import { ROLE, USER_TYPES, WHITE_LISTED_DOMAIN } from "./../constants/constants"
import log from "loglevel"
export * from "./times"

export const isClient = typeof window !== "undefined"

export function Err(message) {
  this.message = message
}

Err.prototype = new Error()

const guideOn = false
export const sizeBg = guideOn ? "#c4deb7" : "transparent"
export const guideBg = guideOn ? "#b2b2b2" : "transparent"

export const videoScrubberGuide = false

export const animateFeaturedMedia = true

export function stringKnife(str, range, remove = false) {
  if (typeof range === "number") range = [range, undefined]
  const [start, end] = range
  const sliced = str.slice(start, end)
  if ((!remove && !end && start > 0) || (remove && start < 0))
    return str.replace(sliced, "")
  return sliced
}

export const isEmpty = obj =>
  obj === null ||
  obj === undefined ||
  (Object.keys(obj).length === 0 && obj.constructor === Object)

export function oneDecimalPlace(price) {
  return (Math.round(price * 10) / 10).toFixed(1)
}

export function removeValueFromArray(value, arr) {
  let newArr: any = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item !== value) newArr = [...newArr, item]
  }
  return newArr
}

export function isWhiteListed(email) {
  for (let i = 0; i < WHITE_LISTED_DOMAIN.length; i++) {
    const domain = WHITE_LISTED_DOMAIN[i]
    if (email.includes("@" + domain)) return true
  }
}
/**
 * Video Scrubber
 */
export function getFrameIndex({ percentage, totalLength }) {
  return Math.floor((percentage * totalLength) / 100)
}

/**
 * UI
 */
export function getUserType({ user }) {
  if (user?.member) return USER_TYPES.MEMBER
  else if (user?.role === ROLE.ADMIN) return USER_TYPES.ADMIN
  else if (user?.trialLeft! > 0) return USER_TYPES.TRIAL
  else if (user) return USER_TYPES.USER
  else return USER_TYPES.GUEST
}

/**
 * Post Layout
 */
export function findArrayValue(key, arr, keyValue) {
  if (arr)
    for (let i = 0; i < arr.length; i++) if (arr[i][key] === keyValue) return i
}

export function findFirstPostByCourseType({ firstPosts, coursePart }) {
  for (let i = 0; i < firstPosts.edges.length; i++) {
    const post = firstPosts.edges[i].node
    if (post.frontmatter.coursePart === coursePart)
      return post.fields.originalPath
  }
}

export function getCoursePostLink({ item, user, firstPosts }) {
  const courseSlug = item.key
  const lastPost = user?.progress?.[courseSlug]?.last
  let postUrl
  if (lastPost) postUrl = `/${courseSlug}${lastPost}`
  else
    postUrl = findFirstPostByCourseType({
      firstPosts,
      coursePart: item.courseParts[0].key,
    })
  return postUrl
}

export function getScrollY() {
  var doc = document.documentElement
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}

export const getParameterByName = (name, url = "") => {
  if (!url && isClient) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const sleep = sec => {
  return new Promise(resolve => setTimeout(resolve, sec * 1000))
}
/**
 * Courses
 */
export function getCourses(intl) {
  return intl.locale === "ko" ? COURSES_KO : COURSES
}

export function findFirstPostByCourse({ firstPosts, courseSlug, intl }) {
  const currentCourse = getCourses(intl).filter(c => c.key === courseSlug)
  const firstCoursePart = currentCourse[0].courseParts[0]

  for (let i = 0; i < firstPosts.edges.length; i++) {
    const post = firstPosts.edges[i].node
    if (
      post.frontmatter.course === courseSlug &&
      post.frontmatter.coursePart === firstCoursePart.key &&
      post.frontmatter.lang === intl.locale
    )
      return post.fields.originalPath
  }
}

export function trimCompletedList(completedList) {
  const obj = {}

  if (completedList) {
    for (let i = 0; i < completedList.length; i++) {
      const item = completedList[i]
      const splited = item.split("/")
      const coursePart = splited[1]
      const slug = splited[2]

      if (!Array.isArray(obj[coursePart])) obj[coursePart] = []
      obj[coursePart].push(slug)
    }

    return obj
  }
}

/**
 * Learn
 */
export function getCourseAndPostId(currentPostPath) {
  const target = currentPostPath.split("/")
  const course = target[1]
  let postId = ""
  for (let i = 2; i < target.length - 1; i++) {
    const element = target[i]
    postId += "/"
    postId += element
  }
  return { course, postId }
}

export function getUserLevel(points) {
  let level = 1
  for (let i = 1; i < POINTS_OF_LEVEL.length; i++) {
    if (points >= POINTS_OF_LEVEL[i]) level += 1
  }
  return level
}

export function getAllCompletedPostsNum(progress: any, allPosts) {
  let sum = 0

  if (progress) {
    for (const [key, value] of Object.entries(progress)) {
      // @ts-ignore
      const completedList = value?.completedList?.filter(i =>
        checkPostExists(allPosts, i)
      )
      if (completedList) sum += completedList.length
    }
  }

  return sum
}

function checkPostExists(allPosts, postPath) {
  for (let i = 0; i < allPosts?.length; i++) {
    const post = allPosts?.[i]
    const path = `/${post.coursePart}/${post.slug}`
    if (postPath === path) return true
  }
}
