import { useState } from "react";
import { adminSections } from "../../data/adminSections";
import NoOptionSelected from "../../components/admin/NoOptionSelected";

const AdminPage = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const selectedSection = adminSections.find(section => section.id === selectedOption);
    const SelectedComponent = selectedSection?.component || NoOptionSelected;

    return (
        <div className="flex h-screen overflow-x-hidden">
            {/* Sidebar */}
            <aside className={`bg-brand-primary text-brand-secondary w-64 md:w-1/5 p-4 absolute md:static inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <a href="/admin"><h2 className="text-xl font-semibold mb-6">Admin</h2></a>
                <nav className="space-y-4">
                    {adminSections.map((section) => (
                        <div key={section.id}>
                            <button
                                onClick={() => setSelectedOption(section.id)}
                                className="block w-full text-left border-b border-brand-secondary pb-2 cursor-pointer hover:text-brand-text"
                            >
                                {section.title}
                            </button>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Mobile Menu Button */}
            <button className="md:hidden fixed top-4 left-4 z-50 text-green-800" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "X" : "☰"}
            </button>

            {/* Main Content */}
            <main className="flex-1 md:p-6">
                <SelectedComponent />
            </main>
        </div>
    );
};

export default AdminPage;