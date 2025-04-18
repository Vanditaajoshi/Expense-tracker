import React from 'react'
import H from "./H"
import SubHeader from './SubHeader'
import { useAppContext } from '../../AppContext'
import './Globals.css'
import { ExpenseWindow } from './Windows/ExpenseWindow'
import { ToastContainer } from "react-toastify";
import AllExpenses from './AllExpenses'
import E from './Expense'

export default function Home() {
  return (
    <div className="poppins w-full h-screen flex justify-center items-center bg-purple-600">
      <div className="w-[59%] max-lg:w-[97%] h-[760px] bg-white shadow-lg rounded-2xl p-12 px-[52px] max-sm:px-[30px] relative z-50">
        <H />
        <SubHeader />
        <AllExpenses />
        <ExpenseWindow />

      </div>

      <ToastContainer />
      <ExpenseOverlay />
    </div>
  )
}

function ExpenseOverlay() {
  const { openExpenseWindowObject: { openExpenseWindow } } = useAppContext();

  if (!openExpenseWindow) return null;

  return (
    <div className="fixed inset-0 w-full h-screen z-40 bg-black opacity-45"></div>
  )
}
