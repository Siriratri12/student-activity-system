import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  MapPin,
  User,
  LayoutGrid,
} from "lucide-react";

import { getActivities } from "../services/api";
import ActivityCard from "../components/ActivityCard";
import "./ActivityList.css";

import bannerImage from "../assets/Branner3.png";

const categories = [
  "ทั้งหมด",
  "อบรม/สัมมนา",
  "จิตอาสา",
  "กีฬา",
  "ศิลปวัฒนธรรม",
  "พัฒนาทักษะอาชีพ",
];

const ITEMS_PER_PAGE = 9;

function ActivityList() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH
  // ============================================================

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (category !== "ทั้งหมด") {
        params.category = category;
      }

      const response = await getActivities(params);

      const result = response.data;

      const data = Array.isArray(result) ? result : result?.data || [];

      setActivities(data);
    } catch (err) {
      console.error("โหลดกิจกรรมไม่สำเร็จ:", err);

      setError("ไม่สามารถโหลดข้อมูลกิจกรรมได้ กรุณาลองใหม่อีกครั้ง");

      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  // ============================================================
  // FILTER
  // ============================================================

  const filteredActivities = activities.filter((activity) => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return true;
    }

    const title = activity.title?.toLowerCase() || "";
    const location = activity.location?.toLowerCase() || "";
    const activityCategory = activity.category?.toLowerCase() || "";

    return (
      title.includes(keyword) ||
      location.includes(keyword) ||
      activityCategory.includes(keyword)
    );
  });

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalItems = filteredActivities.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentActivities = filteredActivities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("ทั้งหมด");
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setPage(1);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
  };

  const handleDetail = (id) => {
    navigate(`/activities/${id}`);
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="activity-page-container">
      {/* ======================================================
          HERO
      ====================================================== */}

      <header className="activity-hero">
        <div className="activity-hero__image-wrapper">
          <img
            src={bannerImage}
            alt="กิจกรรมพัฒนานักศึกษา"
            className="activity-hero__image"
          />

          <div className="activity-hero__overlay" />

          <div className="activity-hero__decoration activity-hero__decoration--one" />
          <div className="activity-hero__decoration activity-hero__decoration--two" />

          <div className="activity-hero__content">
            <span className="activity-hero__badge">PSU Student Activities</span>

            <h1>กิจกรรมพัฒนานักศึกษา</h1>

            <p>
              ค้นพบกิจกรรมที่ใช่ เรียนรู้ประสบการณ์ใหม่
              และพัฒนาศักยภาพไปพร้อมกัน
            </p>
          </div>
        </div>

        {/* ==================================================
            SEARCH / FILTER
        ================================================== */}

        <section className="search-filter-wrapper">
          <div className="container search-filter-container">
            {/* Search */}

            <div className="search-box">
              <Search size={19} className="search-icon" />

              <input
                type="search"
                placeholder="ค้นหาชื่อกิจกรรม สถานที่ หรือประเภท..."
                value={search}
                onChange={handleSearch}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                className="search-input"
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={clearSearch}
                  aria-label="ล้างคำค้นหา"
                  title="ล้างคำค้นหา"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Category */}

            <div className="filter-box">
              <select
                id="category"
                value={category}
                onChange={handleCategory}
                className="category-select"
                aria-label="เลือกประเภทกิจกรรม"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}

            <button
              type="button"
              className="search-submit-btn"
              onClick={handleSearchSubmit}
            >
              <Search size={17} />
              <span>ค้นหา</span>
            </button>
          </div>
        </section>
      </header>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="container activity-main-section">
        {/* ==================================================
            TOOLBAR
        ================================================== */}

        <div className="activity-count-toolbar">
          <div className="activity-count-title">
            <div className="activity-count-icon">
              <LayoutGrid size={19} />
            </div>

            <div>
              <span className="activity-count-label">กิจกรรมทั้งหมด</span>

              <h2>{loading ? "กำลังโหลด..." : `${totalItems} กิจกรรม`}</h2>
            </div>
          </div>

          {!loading && !error && (
            <div className="activity-filter-summary">
              {category !== "ทั้งหมด" && (
                <span className="filter-summary-badge">{category}</span>
              )}

              {search && (
                <span className="filter-summary-text">
                  ผลการค้นหา “{search}”
                </span>
              )}
            </div>
          )}
        </div>

        {/* ==================================================
            LOADING STATE
        ================================================== */}

        {loading && (
          <div className="status-message activity-loading-state">
            <div className="activity-loader" />

            <h3>กำลังโหลดกิจกรรม</h3>

            <p>กรุณารอสักครู่...</p>
          </div>
        )}

        {/* ==================================================
            ERROR STATE
        ================================================== */}

        {!loading && error && (
          <div className="status-message status-message--error">
            <div className="status-error-icon">!</div>

            <h3>เกิดข้อผิดพลาด</h3>

            <p>{error}</p>

            <button
              type="button"
              className="retry-button"
              onClick={fetchActivities}
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        )}

        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {!loading && !error && currentActivities.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">
              <Search size={26} />
            </div>

            <h3>
              {search || category !== "ทั้งหมด"
                ? "ไม่พบกิจกรรมที่ค้นหา"
                : "ยังไม่มีกิจกรรม"}
            </h3>

            <p>
              {search || category !== "ทั้งหมด"
                ? "ลองเปลี่ยนคำค้นหาหรือเลือกประเภทกิจกรรมอื่น"
                : "ขณะนี้ยังไม่มีกิจกรรมในระบบ"}
            </p>

            {(search || category !== "ทั้งหมด") && (
              <button
                type="button"
                className="empty-reset-button"
                onClick={resetFilters}
              >
                แสดงกิจกรรมทั้งหมด
              </button>
            )}
          </div>
        )}

        {/* ==================================================
            ACTIVITY CARDS
        ================================================== */}

        {!loading && !error && currentActivities.length > 0 && (
          <>
            <div className="activity-grid-custom">
              {currentActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onDetail={handleDetail}
                  icons={{
                    clock: CalendarClock,
                    location: MapPin,
                    user: User,
                  }}
                />
              ))}
            </div>

            {/* ==================================================
                  PAGINATION
              ================================================== */}

            {totalPages > 1 && (
              <nav className="pagination-custom" aria-label="หน้าเพจกิจกรรม">
                {/* Previous */}

                <button
                  type="button"
                  className="pagination-arrow"
                  disabled={page === 1}
                  onClick={() => goToPage(page - 1)}
                  aria-label="ไปหน้าก่อนหน้า"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Page numbers */}

                <div className="pagination-numbers">
                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) => index + 1,
                  )
                    .filter((pageNumber) => {
                      if (totalPages <= 7) {
                        return true;
                      }

                      return (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - page) <= 1
                      );
                    })
                    .map((pageNumber, index, array) => {
                      const previousPage = array[index - 1];

                      const showEllipsis =
                        index > 0 && pageNumber - previousPage > 1;

                      return (
                        <div
                          className="pagination-item"
                          key={`page-${pageNumber}`}
                        >
                          {showEllipsis && (
                            <span
                              className="pagination-ellipsis"
                              key={`ellipsis-${pageNumber}`}
                            >
                              ...
                            </span>
                          )}

                          <button
                            type="button"
                            className={`pagination-number ${
                              page === pageNumber ? "active" : ""
                            }`}
                            onClick={() => goToPage(pageNumber)}
                            aria-label={`ไปหน้า ${pageNumber}`}
                            aria-current={
                              page === pageNumber ? "page" : undefined
                            }
                          >
                            {pageNumber}
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Next */}

                <button
                  type="button"
                  className="pagination-arrow"
                  disabled={page === totalPages}
                  onClick={() => goToPage(page + 1)}
                  aria-label="ไปหน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default ActivityList;
