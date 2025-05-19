function HomeImg() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', paddingTop: '50px' }}>
      <img 
        src="../public/ISL_logo.png" 
        alt="展示圖片" 
        style={{ 
          width: '250px', 
          height: 'auto',
          marginBottom: '5px', 
          borderRadius: '23%'
        }} 
      />
      {/* 
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#888', marginTop: '0px' }}>
        Provide by ISL
      </p> 
      */}
    </div>
  );
}

export default HomeImg;