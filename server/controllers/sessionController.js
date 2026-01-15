import Session from "../modals/sessionModal.js";

export const getLoggedInDevices = async (req, res) => {
    console.log("ssssss", req.signedCookies.sid);
    
  try {
    const currentSessionId = req.signedCookies.sid;

    if (!currentSessionId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const sessions = await Session.find({
      userId: req.user._id,
      isRevoked: false
    })
      .sort({ createdAt: -1 })
      .lean();

    const devices = sessions.map(session => ({
      sessionId: session._id,
      deviceName: session.deviceName,
      ipAddress: session.ipAddress,
      lastActiveAt: session.lastActiveAt,
      createdAt: session.createdAt,
      isCurrentDevice: session._id.toString() === currentSessionId
    }));

    res.status(200).json(devices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

