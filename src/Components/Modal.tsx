import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ModalProps } from '../Interfaces/ModalProps';


const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with subtle blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="z-50 fixed inset-0 bg-black/30"
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="top-1/2 left-1/2 z-50 fixed w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="relative rounded-xl overflow-hidden">
                            {/* Layered background for depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50" />
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
                            
                            {/* Content container with shadow */}
                            <div className="relative bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]">
                                {/* Header with subtle gradient */}
                                <div className="flex justify-between items-center border-gray-200/80 bg-gradient-to-b from-white to-gray-50 p-4 border-b">
                                    <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
                                    <button
                                        onClick={onClose}
                                        className="hover:bg-black/5 active:bg-black/10 p-1 rounded-full text-gray-400 hover:text-gray-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                
                                {/* Content with inset shadow */}
                                <div className="bg-gradient-to-br from-white to-gray-50/50 p-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal; 