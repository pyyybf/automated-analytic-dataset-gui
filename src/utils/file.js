export const handleDownload = (data, filename) => {
    let link = document.createElement("a");
    link.href = `data:,${escape(data)}`;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href);
};