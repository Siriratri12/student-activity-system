function ActivityCard({ activity, onDetail, icons }) {
  const ClockIcon = icons.clock;
  const LocationIcon = icons.location;
  const UserIcon = icons.user;

  const date = new Date(activity.date);

  const formattedDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="activity-card-custom">
      {/* รูปกิจกรรม */}
      <div className="card-image-wrapper">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="card-img-top"
        />
      </div>

      {/* เนื้อหาการ์ด */}
      <div className="card-body">
        {/* หมวดหมู่ */}
        <span className="card-category-badge">
          {activity.category || "กิจกรรม"}
        </span>

        {/* ชื่อกิจกรรม */}
        <h3 className="card-title">{activity.title}</h3>

        {/* ข้อมูลกิจกรรม */}
        <div className="card-info-list">
          <div className="info-item">
            <ClockIcon size={18} className="info-icon" />

            <span>
              {formattedDate} เวลา {formattedTime} น.
            </span>
          </div>

          <div className="info-item">
            <LocationIcon size={18} className="info-icon" />

            <span>{activity.location || "ไม่ระบุสถานที่"}</span>
          </div>

          <div className="info-item">
            <UserIcon size={18} className="info-icon" />

            <span>รับ {activity.capacity || 0} คน</span>
          </div>
        </div>

        {/* ปุ่ม */}
        <div className="card-action">
          <button
            type="button"
            className="btn-view-detail"
            onClick={() => onDetail(activity.id)}
          >
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </article>
  );
}

export default ActivityCard;
