import { motion } from 'framer-motion'

const Logo = () => (
  <motion.div
    className="flex items-center px-4 py-2 rounded-xl select-none"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800 font-bold text-2xl text-transparent md:text-3xl">
      Dev
    </span>
    <motion.span 
      className="bg-clip-text bg-gradient-to-r from-green-600 to-green-500 font-bold text-2xl text-transparent md:text-3xl"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      Talks
    </motion.span>
  </motion.div>
)

export default Logo
